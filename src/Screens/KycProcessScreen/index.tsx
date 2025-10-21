import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import toast from 'react-native-toast-message';
import { AuthContext } from '../../Contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgressLoadbar from '../../components/ProgressLoadbar/';
import {
  Container,
  KycBox,
  Title,
  ButtonRow,
  BackButton,
  ButtonText,
  Header,
} from './style';
import ConfirmPopup from '../../components/ConfirmPopup';
import QuestionBlock from '../../components/QuestionBlock';
import SummaryBar from '../../components/SummaryBar';
import { GET_KYCAPI, SAVE_KYCAPI } from '../../Helpers/API';
import { RootStackParamList } from '../../components/Routes'; // make sure you export this from your Routes.tsx
import { Icon } from 'react-native-vector-icons/Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../../components/AppHeader';

// Navigation & Route Types
type KycNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'KycProcessScreen'
>;
type KycRouteProp = RouteProp<RootStackParamList, 'KycProcessScreen'>;

// KYC Item Interface
interface KycItem {
  QUESTION_DETAIL_GUID: string;
  Question_String: string;
  ANSWR: string;
}

const KycProcessScreen: React.FC = () => {
  const navigation = useNavigation<KycNavigationProp>();
  const route = useRoute<KycRouteProp>();
  const { customerProfile } = route.params;

  const { authUser } = useContext(AuthContext);

  const statusId = route.params?.statusId || '';

  const [loading, setLoading] = useState(false);
  const [kycData, setKycData] = useState<KycItem[]>([]);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressLabel, setProgressLabel] = useState('Starting...');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  // Fetch KYC Questions
  useEffect(() => {
    fetchKYC();
  }, []);

  const fetchKYC = () => {
    setLoading(true);
    const body = { CUSTOMER_GID: authUser?.CUSTID_DIGITAL_GID };

    GET_KYCAPI(body, (res: any | null) => {
      setLoading(false);

      // Log the raw response body
      console.log('KYC API Response Body:', res);
      try {
        // Navigate to diffgram -> ReturnDataSet -> ReturnDataTable1
        const returnDataTable =
          res.responseBody?.children?.[0]?.children?.find(
            (c: any) => c.name === 'diffgr:diffgram',
          )?.children?.[0]?.children || [];

        if (!returnDataTable.length) {
          toast.show({ type: 'error', text1: 'No questions found.' });
          return;
        }

        // Map the data into a simple array
        const formattedData: KycItem[] = returnDataTable.map((item: any) => {
          const row: any = {};
          item.children.forEach((child: any) => {
            row[child.name] = child.value || 'N/A';
          });
          // Ensure ANSWR always has a value
          row.ANSWR = row.ANSWR || 'N/A';
          return row;
        });

        setKycData(formattedData);
        console.log('Formatted KYC Data:', formattedData);
      } catch (err) {
        console.error('Error parsing KYC response:', err);
        toast.show({ type: 'error', text1: 'Error parsing KYC response.' });
      }
    });
  };

  // Save KYC Answers
  const saveKYC = () => {
    if (!authUser?.CUSTID_DIGITAL_GID) {
      toast.show({ type: 'error', text1: 'User not authenticated.' });
      return;
    }

    const body = {
      CUSTOMER_GID: authUser.CUSTID_DIGITAL_GID,
      questionList: kycData.map(item => ({
        question_GID: item.QUESTION_DETAIL_GUID,
        set_Value: item.ANSWR && item.ANSWR !== 'N/A' ? item.ANSWR : 'NA',
      })),
    };

    SAVE_KYCAPI(body, (res: any) => {
      console.log('SAVE_KYCAPI Response:', res);

      const children = res?.responseBody?.children?.[0]?.children || [];

      const getValue = (name: string) =>
        children.find((c: any) => c.name === name)?.value || '';

      const messageCode = getValue('MessageCode');
      const isErrorMessage = getValue('IsErrorMessage');
      const message = getValue('Message');
      const statusID = getValue('StatusID'); // <-- use this for navigation

      if (messageCode === '2' && isErrorMessage === 'false') {
        setProgressLabel('KYC saved successfully.');
        setShowProgressBar(true);

        // Navigate to dashboard with updated status
        setTimeout(() => {
          navigation.navigate('Dashboard', { statusId: statusID });
        }, 2000); // 1 second delay
      } else {
        toast.show({ type: 'error', text1: message || 'Failed to save KYC.' });
      }
    });
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const updated = [...kycData];
    updated[index].ANSWR = answer;
    setKycData(updated);
  };

  // if (loading) return <LoadingSpinner />;

  const totalQuestions = kycData.length;
  const countYes = kycData.filter(q => q.ANSWR === 'YES').length;
  const countNo = kycData.filter(q => q.ANSWR === 'NO').length;
  const countNA = kycData.filter(q => q.ANSWR === 'N/A').length;

  return (
    <>
      <Container source={require('../../Assets/images/mobilebg.jpg')}>
        {loading && <LoadingSpinner />}
        <AppHeader showBack={true} onBackPress={() => navigation.goBack()} />

        <KycBox>
          <Title>KYC</Title>

          {totalQuestions > 0 && (
            <SummaryBar
              total={totalQuestions}
              yes={countYes}
              no={countNo}
              na={countNA}
            />
          )}

          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{
              flex: 1,
              // padding: 14,
              borderRadius: 8,
              // shadowOpacity: 0.3,
              // shadowRadius: 10,
            }}
          >
            {kycData.map((item, i) => (
              <QuestionBlock
                key={i}
                index={i}
                question={item.Question_String}
                answer={item.ANSWR}
                onChange={ans => handleAnswerChange(i, ans)}
              />
            ))}
          </ScrollView>
          {!customerProfile?.isKYC_Eval && (
            <ButtonRow>
              r
              <BackButton
                onPress={() =>
                  navigation.navigate('Dashboard', { statusId: undefined })
                }
              >
                <ButtonText>Skip</ButtonText>
              </BackButton>
              <BackButton onPress={() => setShowConfirmPopup(true)}>
                <ButtonText>Submit</ButtonText>
              </BackButton>
            </ButtonRow>
          )}
        </KycBox>

        {showConfirmPopup && (
          <ConfirmPopup
            visible={showConfirmPopup}
            onConfirm={() => {
              setShowConfirmPopup(false);
              saveKYC();
            }}
            onCancel={() => setShowConfirmPopup(false)}
          />
        )}
      </Container>
      {showProgressBar && <ProgressLoadbar label={progressLabel} />}
    </>
  );
};

export default KycProcessScreen;
