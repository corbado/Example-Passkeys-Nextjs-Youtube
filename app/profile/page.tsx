import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../_utils/LogoutButton";
import getNodeSDK from "../_utils/nodeSdk";
import PasskeyList from "../_utils/PasskeyList";

export default async function Profile() {
  const cookieStore = cookies();
  const session = cookieStore.get("cbo_short_session");

  if (!session) {
    return redirect("/");
  }

  const sdk = getNodeSDK();
  let user;

  try {
    user = await sdk.sessions().getCurrentUser(session.value);
    if (!user.isAuthenticated()) {
      throw Error;
    }
  } catch {
    return redirect("/");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        User-ID: {user.getID()}
        <br />
        Email: {user.getEmail()}
      </p>
      <LogoutButton />
      <PasskeyList />
    </div>
  );
}
