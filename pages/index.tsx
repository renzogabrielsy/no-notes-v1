import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

// Import the Progress component

interface CompletionResponse {
  response: string;
}

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [progressValue, setProgressValue] = useState(0);

  // Handle user input change
  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Initialize interval as null

    if (isLoading) {
      // Start the interval only when loading
      interval = setInterval(() => {
        setProgressValue((oldValue) => (oldValue < 100 ? oldValue + 10 : 0));
      }, 200);
    } else {
      setProgressValue(100); // Complete the progress when loading is done
      if (interval) clearInterval(interval); // Clear the interval if it's set
    }

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  async function fetchCompletion(
    userInput: string
  ): Promise<string | undefined> {
    try {
      const response = await axios.post<CompletionResponse>(
        "/api/get-completion",
        {
          userInput,
        }
      );
      return response.data.response;
    } catch (error: any) {
      console.error("Error:", error.response?.data.error ?? error.message);
    }
  }

  // Handle sending the message
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true); // Set loading to true when the API call starts
    const response = await fetchCompletion(userInput);
    setIsLoading(false); // Set loading to false when the API call completes

    setChatResponse(response || "Error: Could not get a response.");
    setUserInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-full">
      <Card className="shadow-md w-[50%] h-[700px]">
        <CardHeader>
          <CardTitle>{`Renzo's ChatGPT App`}</CardTitle>
          <CardDescription>This is a test.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-[85%]">
          {/* Display progress bar when loading */}
          {isLoading ? (
            <div className="flex flex-row justify-center items-start h-full flex-grow w-full overflow-auto">
              <div className="flex flex-col justify-center items-center h-full w-52">
                <Progress value={progressValue} />
              </div>
            </div>
          ) : (
            // Display the chat response when not loading
            <div className="h-full flex-grow  overflow-auto">
              <div className="p-4 bg-gray-100">{chatResponse}</div>
            </div>
          )}

          <div>
            <Textarea
              className="resize-none mb-4"
              placeholder="Type your message here."
              value={userInput}
              onChange={handleUserInputChange}
            />
            <Button className="w-full" onClick={handleSendMessage}>
              Send message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
