const initialState = {}

const saveCredentialReducer = function (state = initialState, action) {
    switch (action.type) {
      case "SAVECREDENTIAL":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  export default saveCredentialReducer;