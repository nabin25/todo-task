import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateTodoForm } from "./CreateTodoForm";
import { PlusCircle } from "lucide-react";

const CreateTodoSheet = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant="outline" className="text-[11px] h-7">
            <PlusCircle />
            Add Todo
          </Button>
        </SheetTrigger>
        <SheetContent className="p-3" side="right">
          <SheetTitle>Add Todo Form</SheetTitle>
          <SheetDescription>
            <CreateTodoForm setOpen={setOpen} />
          </SheetDescription>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateTodoSheet;
