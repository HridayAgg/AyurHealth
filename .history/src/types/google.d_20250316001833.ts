interface Window {
  gapi: {
    load(api: string, callback: () => void): void;
    auth2: {
      init(params: {
        client_id: string;
        scope: string;
      }): Promise<void>;
      getAuthInstance(): {
        signIn(options?: { scope: string }): Promise<{
          getAuthResponse(): {
            access_token: string;
            expires_at: number;
          };
        }>;
        signOut(): Promise<void>;
        isSignedIn: {
          get(): boolean;
          listen(callback: (isSignedIn: boolean) => void): void;
        };
      };
    };
  };
} 