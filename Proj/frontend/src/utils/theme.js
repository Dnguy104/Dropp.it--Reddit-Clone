export const colors = {
  grey90: '#959595',
  grey70: '#818384',
  grey60: '#727272',
  grey50: '#525252',
  grey40: '#414141',
  grey30: '#313131',
  grey20: '#282C34',
  grey10: '#23272e',
  white90: '#f7f7f7',
  white70: '#c9c9c9',
}

const theme = {
  size: {
    xxs50: '50px',
    xs: '100px',
    xs50: '150px',
    sm: '200px',
    sm50: '250px',
    md: '300px',
    md50: '350px',
    lg: '400px',
    lg50: '450px',
    xl: '500px',
    xl50: '550px',
    xxl: '600px',
  },

  fontSize: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    xxl: '20px',
  },

  themes: {
    dark: {
      background: 'black',
      highlight: '#3378f2',
      element2: '#141414',
      element: '#1a1a1b',
      colorC: colors.grey60,
      colorA: '#748490',
      colorB: '#fdfdfd',
    },
    light: {
      background: '#d8e1eb',
      element2: '#d8dce3',
      highlight: '#3378f2',
      element: 'white',
      colorC: colors.grey70,
      colorA: colors.grey70,
      colorB: 'black',
    }
  }


}

export default theme;
