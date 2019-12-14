
const regex = () => {
  return {
    emailValidate: {
      regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    passwordValidate: {
      sixCharactersRegex: /(?=.{6,})/,
      specialCharacterRegex: /(?=.*[@$!%*#?&])/,
      upperAndLowerRegex: /^(?=.*[a-z])(?=.*[A-Z])/,
      numberRegex: /(?=.*[0-9])[A-Za-z0-9]+/
    }
  }
}


export { regex }
