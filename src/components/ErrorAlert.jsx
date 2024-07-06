import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";

function getErrorMessage(errorCode) {
  console.log(errorCode);
  const errorMessages = {
    "auth/invalid-email": "The email address is not valid.",
    "auth/user-disabled":
      "The user account has been disabled by an administrator.",
    "auth/user-not-found": "There is no user corresponding to the given email.",
    "auth/wrong-password":
      "The password is invalid or the user does not have a password.",
    "auth/email-already-in-use":
      "The email address is already in use by another account.",
    "auth/operation-not-allowed":
      "Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.",
    "auth/weak-password": "The password is too weak.",
    "auth/credential-already-in-use":
      "This credential is already associated with a different user account.",
    "auth/invalid-credential": "The provided credential is invalid or expired.",
    // Add more error codes and messages as needed
  };

  if (errorCode instanceof z.ZodError) {
    return errorCode.errors[errorCode.errors.length - 1].message;
  }

  return errorMessages[errorCode] || "An unknown error occurred.";
}

export function ErrorAlert({ error }) {
  return (
    <Alert variant="destructive" className="my-4">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>{getErrorMessage(error)}</AlertTitle>
      {/* <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription> */}
    </Alert>
  );
}
