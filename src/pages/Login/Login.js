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

import styles from './Login.style';
import InputBox from '../../components/InputBox';
import ButtonBox from '../../components/ButtonBox';
import AuthParser from '../../utils/AuthParser';
import ColorCode from '../../utils/ColorCode';

export default function ({navigation}) {
  //formik variables and states
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: '',
    password: '',
  };
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  //handle action functions
  const handleLogin = async ({email, password}) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      showMessage({
        message: AuthParser('successfulLogin'),
        type: 'success',
        duration: 1000,
      });
    } catch (error) {
      showMessage({
        message: AuthParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
  };

  function handleSignup() {
    navigation.navigate('SignupPage');
  }

  function handleForgot() {
    navigation.navigate('ForgotPage');
  }

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
            onSubmit={handleLogin}
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
                <InputBox
                  value={values.password}
                  onChange={handleChange('password')}
                  placeholder="Password"
                  isSecure={true}
                  theme={!errors.password ? 'primary' : 'secondary'}
                />
                <View style={styles.containerButton}>
                  <ButtonBox
                    text="Login"
                    onPress={handleSubmit}
                    isLoading={loading}
                  />
                  <ButtonBox
                    text="Signup"
                    theme="secondary"
                    onPress={handleSignup}
                  />
                  <Button
                    title={'Forgot My Password'}
                    color={ColorCode('grey2')}
                    onPress={handleForgot}
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
