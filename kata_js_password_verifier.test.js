/**
 * https://osherove.com/tdd-kata-3
 *  Create a Password verifications class called “PasswordVerifier”.
Add the following verifications to a master function called “Verify()”

1. password should be larger than 8 chars

2. password should not be null

3. password should have one uppercase letter at least

4. password should have one lowercase letter at least

5. password should have one number at least

Each one of these should throw an exception with a different message of your choosing

6. Add feature: Password is OK if at least three of the previous conditions is true

7. Add feature: password is never OK if item 4 is not true.

8. Assume Each verification takes 1 second to complete. How would you solve  items 2 and 3  so tests can run faster?
 * 
 */

const verifyPassword = (rules, mustRules, input) => {
  if (mustRules.length > 0) {
    const failed = rules
      .map(rule => rule(input))
      .filter(result => result === false);
      if (failed.length > 0) {
        throw new Error(ERROR_PASSWORD_WITH_NOT_AT_LEAST_A_LOWER_CASE_LETTER);
      }
  }
  if (rules.length > 0) {
    const success = rules
      .map(rule => rule(input))
      .filter(result => result === true);

    if (success.length >= 3) {
      return true;
    } else {
      throw new Error(ERROR_PASSWORD_WITH_LESS_THAN_THREE_RULES);
    }
  }
  throw new Error(ERROR_EMPTY_PASSWORD_RULES);
};


const hastAtLeastOneCharacterWhichMatchesCondition = (
  (condition, word) => {
    for (i=0; i < word.length; i++) {
      if (condition(word.charAt(i)))
        return true
    }
    return false;
  });
const passwordMinimunLengthRule = (input) => { return (input.length >= 8); };
const passwordNotNullhRule = (input) => { return (input != null);};
const passwordWithAtLeastOneUpperCaseLetterRule = (input) => {
  const condition = (character) => { return (character >= 'A' && character <= 'Z')};
  return hastAtLeastOneCharacterWhichMatchesCondition(condition, input);
};
const passwordWithAtLeastOneLowerCaseLetterRule = (input) => {
  const condition = (character) => { return (character >= 'a' && character <= 'z')};
  return hastAtLeastOneCharacterWhichMatchesCondition(condition, input);
};
const passwordWithAtLeastANumberRule = (input) => {
  const condition = (character) => { return (character >= '0' && character <= '9')};
  return hastAtLeastOneCharacterWhichMatchesCondition(condition, input);
};
const ERROR_EMPTY_PASSWORD_RULES = 'Error rules can not be empty';
const ERROR_PASSWORD_WITH_LESS_THAN_THREE_RULES = 'Error password with less than three rules';
const ERROR_PASSWORD_WITH_NOT_AT_LEAST_A_LOWER_CASE_LETTER = 'Error password with not at least a lower case letter';

const passwordCompountRules = [
  passwordMinimunLengthRule, 
  passwordNotNullhRule, 
  passwordWithAtLeastOneUpperCaseLetterRule,
  passwordWithAtLeastOneLowerCaseLetterRule,
  passwordWithAtLeastANumberRule
];

function failTest() {
  throw new Error("didn't throw");
}

describe('Password Verification', () => {
  // 1. password should be larger than 8 chars
  test('Password Rule, password shorter than 8 chars, fails', () => {
    const result = passwordMinimunLengthRule ('1234567');

    expect(result).toBe(false);
  });

  test('Password Rule, password larger than 8 chars, passes', () => {
    const result = passwordMinimunLengthRule ('12345678');

    expect(result).toBe(true);
  });

  //2. password should not be null
  test('Password Rule, null password, fails', () => {
    const result = passwordNotNullhRule(null);

    expect(result).toBe(false);
  });

  test('Password Rule, not null password, passes', () => {
    const result = passwordNotNullhRule('');

    expect(result).toBe(true);
  });

  //3. password should have one uppercase letter at least
  test('Password Rule, password with none uppercase letter, fails', () => {
    const result = passwordWithAtLeastOneUpperCaseLetterRule('any input');
    expect(result).toBe(false);

  });

  test('Password Rule, password with at least one uppercase letter, passes', () => {
    const result = passwordWithAtLeastOneUpperCaseLetterRule('Any input');
    expect(result).toBe(true);

  });

  //4. password should have one lowercase letter at least
  test('Password Rule, password with none lowercase letter, fails', () => {
    const result = passwordWithAtLeastOneLowerCaseLetterRule('ANY INPUT');
    expect(result).toBe(false);
  });

  test('Password Rule, password with at least one lowercase letter, passes', () => {
    const result = passwordWithAtLeastOneLowerCaseLetterRule('aNY INPUT');
    expect(result).toBe(true);
  });

  //* 5. password should have one number at least
  test('Password Rule, password with none number, fails', () => {
    const result = passwordWithAtLeastANumberRule('any input');
    expect(result).toBe(false);
  });
  test('Password Rule, password with at least one number, passes', () => {
    const result = passwordWithAtLeastANumberRule('1any input');
    expect(result).toBe(true);
  });

  // Each one of these should throw an exception with a different message of your choosing
  //6. Add feature: Password is OK if at least three of the previous conditions is true
  test('verifyPassword, password with less than three conditions, throws exception', () => {
   
    const passwordNotNullAndAtLeastOneLowerCaseLetter = 'any';
    try {
        const result = verifyPassword(passwordCompountRules, [], passwordNotNullAndAtLeastOneLowerCaseLetter);
        failTest();
    } catch(exception) {
      expect(exception.message).toBe(ERROR_PASSWORD_WITH_LESS_THAN_THREE_RULES);
    }
    
  });

  test('verifyPassword, password with at least three conditions, passes', () => {
    
    const passwordNotNullAndAtLeastOneLowerCaseLetterAndANumber = '1any';
    const result = verifyPassword(passwordCompountRules, [], passwordNotNullAndAtLeastOneLowerCaseLetterAndANumber);
    expect(result).toBe(true);
  });


  test('verifyPassword, no rules, throws and exception', () => {
    
    try {
      verifyPassword([], 'any input');
      verifyPassword(null, 'any input');
     failTest();
    } catch (exception) {
      expect(exception.message).toBe(ERROR_EMPTY_PASSWORD_RULES);
    }
  });
  
  //7. Add feature: password is never OK if item 4 is not true.
  test('verifyPassword, password with not passwordWithAtLeastOneLowerCaseLetterRule, throws exception', () => {
   
    const passwordWithNotLowerCaseLetters = 'ANY aENGHT';
    try {
        const result = verifyPassword(passwordCompountRules, 
          passwordWithAtLeastOneLowerCaseLetterRule, 
          passwordWithNotLowerCaseLetters);
        failTest();
    } catch(exception) {
      expect(exception.message).toBe(ERROR_PASSWORD_WITH_NOT_AT_LEAST_A_LOWER_CASE_LETTER);
    }
    
  });
});


