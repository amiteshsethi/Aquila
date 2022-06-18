import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useState } from "react";
import { toast } from "react-hot-toast";
import userimg from '../assests/images/userimg.png'

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;

    if (!name || !password || !confirmpassword) {
      toast.error("Fill all fields to make ur desired edits");
      error = true;
    }

    if (password !== confirmpassword) {
      toast.error("passsword and confirm-password donot match");
      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response =await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmpassword,
    );
    
    console.log('setting response' ,response)
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return toast.success("user Updated successfully.");
    } else {
      return toast.error(response.message);
    }
    // setSavingForm(true);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
        src={userimg}
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            placeholder={auth.user.name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {" "}
              {savingForm ? "Saving ... " : "Save Changes"}
            </button>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
