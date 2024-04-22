import { Plus, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { socket } from "@/lib/socket";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useUserStore } from "@/Store";

export const CreateWhiteBoard = () => {
  const user = useUserStore((state) => state.username);
  const navigate = useNavigate();
  useEffect(() => {
    const handleCreate = (data: string) => {
      localStorage.setItem("sessionId", data);
      navigate({ to: `/whiteboard/${data}?user=admin` });
    };
    socket.on("session-created", handleCreate);
    return () => {
      socket.off("session-created", handleCreate);
    };
  }, [navigate]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="container py-5">
      <h1 className="mt-5 text-center text-2xl">
        Hello{" "}
        <span className="font-bold capitalize text-green-500">{user}</span>
      </h1>
      <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row">
        <div
          className="grid size-60 cursor-pointer place-items-center rounded-lg border bg-secondary"
          onClick={() => {
            socket.emit("create-session", "ankitsharma");
          }}
        >
          <div className="flex flex-col items-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="text-muted-foreground"
            >
              <Plus className="size-10" />
            </Button>
            <span className="rounded-lg text-muted-foreground">Create new</span>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className=" grid size-60 cursor-pointer place-items-center rounded-lg border bg-secondary">
              <div className="flex flex-col items-center">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="text-muted-foreground"
                >
                  <UserRound className="size-10" />
                </Button>
                <span className="rounded-lg text-muted-foreground">
                  Join a session
                </span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="enter your sesion-id"
                ref={inputRef}
              />
              <Button
                className="w-full"
                onClick={() => {
                  if (inputRef.current) {
                    socket.emit("join-session", inputRef.current.value);
                    localStorage.setItem("sessionId", inputRef.current.value);
                    navigate({ to: `/whiteboard/${inputRef.current.value}` });
                  }
                }}
              >
                Join
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
