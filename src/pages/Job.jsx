import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { getSingleJob, updateHiringStatus } from "../api/jobsApi";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, DoorClosed, DoorOpen, MapPin } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ApplyJob from "../components/ApplyJob";
import ApplicationCard from "../components/ApplicationCard";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id },
  );

  const handleHiringStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <section className="mt-5 flex flex-col gap-8">
      <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
        <h1 className="gradient-title pb-3 text-4xl font-extrabold sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} alt="Com Logo" className="h-12" />
      </div>

      {/* Job Details */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPin /> {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* Hiring Status */}
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleHiringStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring status" + (job?.isOpen ? " (Open)" : " (Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* About the job */}
      <h2 className="text-2xl font-bold sm:text-3xl">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-2xl font-bold sm:text-3xl">
        What are we looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* Apply Job Btn */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJob
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}

      {/* Show Application */}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold sm:text-3xl">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Job;
