import { Card, CardContent, CardFooter, CardHeader,CardTitle } from "@/app/components/ui/card";
import Socials from "./socials";
import { BackButton } from "@/app/components/auth/back-button";

type CardWrapperProps = {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
    showSocial?: boolean;
}

export const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocial,

}: CardWrapperProps) => {
    return(
      <Card>
      <CardHeader>
        <CardTitle >{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter className="border-none">
            <Socials/>
        </CardFooter>
      )}
        <CardFooter className="border-none">
            <BackButton href={backButtonHref} label={backButtonLabel}/>
        </CardFooter>
        
    </Card>
    )
}