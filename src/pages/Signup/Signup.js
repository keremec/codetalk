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

import styles from './Signup.style';
import InputBox from '../../components/InputBox';
import ButtonBox from '../../components/ButtonBox';
import AuthParser from '../../utils/AuthParser';
import ColorCode from '../../utils/ColorCode';
import database from '@react-native-firebase/database';

export default function ({navigation}) {
  //formik variables and states
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: '',
    password: '',
    repassword: '',
  };
  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    repassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
  });

  //handle action functions
  function handleLogin() {
    navigation.navigate('LoginPage');
  }

  const handleSignup = async ({email, password}) => {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      const contentObject = {
        username: user.email.split('@')[0],
        isNewUser: true,
      };
      await database()
        .ref('Profiles/' + user.uid)
        .set(contentObject);
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
            onSubmit={handleSignup}
            validationSchema={signupValidationSchema}>
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
                  theme={
                    errors.password || errors.repassword
                      ? 'secondary'
                      : 'primary'
                  }
                />
                <InputBox
                  value={values.repassword}
                  onChange={handleChange('repassword')}
                  placeholder="Confirm Password"
                  isSecure={true}
                  theme={!errors.repassword ? 'primary' : 'secondary'}
                />
                <View style={styles.containerButton}>
                  <ButtonBox
                    text="Sign Up"
                    theme="secondary"
                    isLoading={loading}
                    onPress={handleSubmit}
                  />
                  <Button
                    title={'Already have an account?'}
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
