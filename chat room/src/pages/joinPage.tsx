import { genRanHex, roomAtom } from "@/atoms/createRoomAtom";
import { CopyIcon } from "@/components/icons/copyIcon";
import { MainIcon } from "@/components/icons/mainlogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/components/ui/signinForm";
import { TopBar } from "@/components/ui/topbar";
import { useRecoilState } from "recoil";

export function JoinPage() {
  const [getter, setter] = useRecoilState(roomAtom);

  return (
    <>
      <TopBar />
      <div className="flex justify-center h-screen">
        <div className="flex items-center">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MainIcon /> Real Time Chat
              </CardTitle>
              <CardDescription>
                Temporpary room that expires after all users exit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center pb-5">
                <Button
                  size={"full"}
                  onClick={() => {
                    setter(genRanHex(6));
                  }}
                >
                  create room
                </Button>
              </div>
              <SignInForm />
            </CardContent>
            <CardFooter>
              {getter && (
                <div className="bg bg-gray-300 dark:bg-gray-500  rounded-md p-6 w-full ">
                  <div className="text-sm flex justify-center">
                    share this with your friend
                  </div>
                  <div className="flex justify-center">
                    <div>{getter}</div>
                    <div
                      className="pl-1"
                      onClick={async () => {
                        await navigator.clipboard.writeText(getter);
                      }}
                    >
                      <CopyIcon />
                    </div>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
