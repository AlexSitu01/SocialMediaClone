import { use, useEffect, useState } from "react"
import { UsernameQuestionare } from "./UsernameQuestionare";
import { ProfilePicQuestionare } from "./ProfilePicQuestionare";
import { BioQuestionare } from "./BioQuestionare";
import { useNavigate } from "react-router-dom";
import { addProfileSetup } from "../lib/firebase/database";

export interface CarouselProps {
    handleNext: () => void,
    handlePrev: () => void
}



export function ProfileSetupCarasel() {

    const COMPS = ["USERNAME", "PROFILE_PIC", "BIO"];
    const [usernameError, setUsernameError] = useState<"EMPTY" | "INAPPROPRIATE" | undefined>()
    const [currentComp, setCurrentComp] = useState<number>(0);
    const [userName, setUserName] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [imageFile, setImageFile] = useState<string>("")
    const [fileName, setFileName] = useState<string>("")
    const navigation = useNavigate()

    const handleSubmit = async() => {
        // send data to database
        await addProfileSetup(userName, imageFile, bio)
        // navigate to profile page
        navigation("/profile")
    }

    const handleNext = () => {
        setCurrentComp((prev) => {
            if (prev === 0) {
                if (userName === "") {
                    setUsernameError("EMPTY");
                    return prev
                }
            }
            if (prev === COMPS.length - 1) {
                handleSubmit()
                return prev;
            }
            if (prev < COMPS.length - 1) {
                return prev + 1;
            }
            return prev;
        });
    };

    const handlePrev = () => {
        setCurrentComp((prev) => {
            if (prev > 0) {
                return prev - 1;
            }
            return prev;
        });
    };

    const renderComponent = () => {
        switch (COMPS[currentComp]) {
            case "USERNAME":
                return <UsernameQuestionare setUsername={setUserName} userName={userName} userNameErorr={usernameError} handleNext={handleNext} handlePrev={handlePrev}></UsernameQuestionare>;
            case "PROFILE_PIC":
                return <ProfilePicQuestionare setFileName={setFileName} fileName={fileName} imageFile={imageFile} setImageFile={setImageFile} handleNext={handleNext} handlePrev={handlePrev}></ProfilePicQuestionare>;
            case "BIO":
                return <BioQuestionare bio={bio} setBio={setBio} handleNext={handleNext} handlePrev={handlePrev}></BioQuestionare>;
            default:
                return null; // or a fallback component
        }
    };
    return (
        <>
            {renderComponent()}
        </>
    )
}