export const processServiceMock = (() => {
  return {
    /**
     * Mock a call to upload a file.
     *
     * e.g: processServiceMock.uploadFile().mockSuccess({error: false})
     *
     */
    uploadFile,
  };

  function uploadFile() {
    const emptyCallback = function() {
      return this;
    };

    const callback = (response?: object) => {
      return function(fn) {
        const data = {
          response: JSON.stringify(response || {}),
        };

        fn(data);

        return this;
      };
    };

    return {
      mockSuccess: (response?: object) => {
        return {
          error: emptyCallback,
          progress: emptyCallback,
          success: callback(response),
        };
      },
      mockError: (
        response?: object,
        customCallback: (response?: object) => any = callback
      ) => {
        return {
          progress: emptyCallback,
          success: emptyCallback,
          error: customCallback(response),
        };
      },
    };
  }
})();
