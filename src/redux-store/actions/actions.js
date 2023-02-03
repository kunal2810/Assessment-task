
export const saveCredentials = (userInfo) => {
    return {
      type: "SAVECREDENTIAL",
      payload: userInfo,
    };
  };