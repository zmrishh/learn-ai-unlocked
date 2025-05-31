export const mockLogin = (email?: string, password?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      // Simulate API call delay
      setTimeout(() => {
        resolve("mock-jwt-token");
      }, 1000);
    } else {
      reject("Email and password are required.");
    }
  });
};
