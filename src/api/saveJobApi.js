import supabaseClient from "../utils/supabase";

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (!alreadySaved) {
    const { data, error: saveError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (saveError) {
      console.error("Error while saving job:", saveError);
      return null;
    }
    return data;
  } else {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error while deleteing saved job:", deleteError);
      return null;
    }

    return data;
  }
}

export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}
