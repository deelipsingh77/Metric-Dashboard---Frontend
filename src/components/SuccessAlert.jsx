import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SuccessAlert() {
  return (
    <Alert variant="default" className="my-4 absolute top-0 left-0 mx-auto w-[calc(100% - 100px)]">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Data Submitted Successfully</AlertTitle>
      {/* <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription> */}
    </Alert>
  );
}
