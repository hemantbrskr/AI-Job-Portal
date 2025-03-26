import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { updateApplicationsStatus } from "../api/applicationsApi";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationsStatus,
    {
      job_id: application.job_id,
    },
  );

  const handleHiringStatusChange = (status) => {
    fnHiringStatus(status);
  };
  return (
    <Card>
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold capitalize">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="h-8 w-8 cursor-pointer rounded-full bg-white p-1.5 text-black"
            onClick={handleDownloadResume}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={15} /> {application?.experience} years of
            experience
          </div>
          <div className="flex items-center gap-2">
            <School size={15} /> {application?.education}
          </div>
          <div className="flex items-center gap-2">
            <Boxes size={15} /> Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>

      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="font-bold capitalize">
            Status: {application?.status}
          </span>
        ) : (
          <>
            <Select
              onValueChange={handleHiringStatusChange}
              defaultValue={application?.status}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
