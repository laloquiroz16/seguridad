export const uploadService = (() => {
  return {
    /**
     * Mock a call to upload a file.
     *
     * e.g: uploadService.upload().mockSuccess({error: false})
     *
     */
    upload
  };

  function upload() {
    const emptyCallback = function() {
      return this;
    };

    const callback = (response?: object) => {
      return function(fn) {
        const data = {
          response: JSON.stringify(response || {})
        };

        fn(data);

        return this;
      };
    };

    const errorCallback = (response?: object) => {
      return fn => {
        fn(response);
        return this;
      };
    };

    return {
      mockSuccess: (
        response?: object,
        customCallback: (response?: object) => any = callback
      ) => {
        return {
          error: emptyCallback,
          progress: emptyCallback,
          success: customCallback(response)
        };
      },
      mockError: (
        response?: object,
        customCallback: (response?: object) => any = errorCallback
      ) => {
        return {
          progress: emptyCallback,
          success: emptyCallback,
          error: customCallback(response)
        };
      }
    };
  }
})();
