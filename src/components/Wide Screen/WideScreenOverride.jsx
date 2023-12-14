import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import QRcode from "../../assets/QRcode.png";

export default function WideScreenOverride() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-[80%] max-h-[85vh] p-10 flex flex-row-reverse justify-center items-center backdrop-blur absolute border-none bg-background/70 dark:bg-default-100/80">
        <CardHeader className="gap-6 flex flex-col justify-center items-center max-w-[80%] max-lg:max-w-[100%] px-2">
          <h1 className="text-4xl font-semibold pt-5 px-10 ">
            Shrink your screen down to see the project in action!
          </h1>
          <p className="max-w-[80%] max-lg:max-w-[100%] text-center">
            For the ultimate experience, squeeze it down below 500px. Grab your
            devTools in Chrome (Inspect > CTRL + SHIFT + M > iPhone 12 Pro) and
            enjoy the magic.
          </p>
          <h2 className="max-w-[80%] max-lg:max-w-[100%] text-center">
            For the best experience, scan this QR code with your phone.
          </h2>
          <img
            className="rounded-lg h-32 w-32 m-4"
            src={QRcode}
            alt="QR Code"
          ></img>
          <p className="max-w-[80%] max-lg:max-w-[100%] text-center">
            (Opening the link on your phone works too, but where's the adventure
            in that?)
          </p>
        </CardHeader>
        <CardBody className="min-w-[20%] max-xl:min-w-[40%] max-lg:hidden"></CardBody>
      </Card>

      {/* phone mockup from https://github.com/themesberg/flowbite/blob/main/content/components/device-mockups.md?plain=1 */}
      <div className="absolute left-32 -rotate-6 max-lg:hidden">
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

          <Skeleton className="before:animate-[shimmer_4s_infinite] rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-background dark:bg-black"></Skeleton>
        </div>
      </div>
    </div>
  );
}
