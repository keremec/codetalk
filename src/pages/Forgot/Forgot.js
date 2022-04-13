import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import styles from './Forgot.style';
import InputBox from '../../components/InputBox';
import ButtonBox from '../../components/ButtonBox';
import AuthParser from '../../utils/AuthParser';
import ColorCode from '../../utils/ColorCode';

export default function ({navigation}) {
  //formik variables and states
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: '',
  };
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
  });

  //handle action functions
  function handleLogin() {
    navigation.navigate('LoginPage');
  }

  const handleForgot = async ({email}) => {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      showMessage({
        message: 'Password reset link successfully send to your email',
        type: 'success',
        duration: 3000,
      });
      navigation.navigate('LoginPage');
    } catch (error) {
      showMessage({
        message: AuthParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.containerTop} />
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <SafeAreaView style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={{color: ColorCode('grey5'), fontSize: 40}}>
              />codetalk
            </Text>
          </View>
          <Formik
            validateOnChange={false}
            initialValues={defaultValues}
            onSubmit={handleForgot}
            validationSchema={loginValidationSchema}>
            {({handleSubmit, handleChange, values, errors}) => (
              <View style={styles.containerForm}>
                <InputBox
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder="Email"
                  theme={!errors.email ? 'primary' : 'secondary'}
                  keyboardType={'email-address'}
                />
                <View style={styles.containerButton}>
                  <ButtonBox
                    text="Reset Password"
                    onPress={handleSubmit}
                    isLoading={loading}
                    theme={'secondary'}
                  />
                  <Button
                    title={'Go Back'}
                    color={ColorCode('grey2')}
                    onPress={handleLogin}
                  />
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
