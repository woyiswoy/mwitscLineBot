import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup
  .object({
    studentid: yup.number().moreThan(7000).lessThan(10000),
  })
  .required();

export default function Home({ profile, loaded, userData, userLoaded }) {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    data.profile = profile;
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.ok) {
          setLoginError(null);
          setLoginSuccess(true);
          router.reload(window.location.pathname);
        } else {
          setLoginError(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(data);
  };

  return (
    <div className="px-8">
      {loaded && userLoaded && profile ? (
        <div className="space-y-2">
          <div className="items-center text-center rounded-lg">
            <div className="ds-avatar">
              <div className="w-24 ds-mask ds-mask-squircle">
                <img src={profile.pictureUrl} />
              </div>
            </div>
            <h2 className=" text-base-content text-xl font-bold p-2">
              {profile.displayName}
            </h2>
            {userData ? (
              <div className="ds-badge ds-badge-success space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>ลงทะเบียนแล้ว</span>
              </div>
            ) : (
              <div className="ds-badge ds-badge-warning space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>กรุณาลงทะเบียนเพื่อเริ่มใช้งาน</span>
              </div>
            )}
          </div>
          <div className="ds-card-actions justify-end space-y-1">
            {userData ? (
              <div className="ds-card ds-card-compact w-full bg-base-100 border-2 border-primary">
                <div className="ds-card-body">
                  <h2 className="ds-card-title">ข้อมูลของคุณ</h2>
                  <p>
                    {userData.firstname + " " + userData.lastname} ชั้น{" "}
                    {(36 - userData.gen).toString() + "/" + userData.room}{" "}
                    เลขที่ {userData.number}
                  </p>
                  {/* <div className="ds-card-actions justify-end">
                  <button className="ds-btn ds-btn-primary">Buy Now</button>
                </div> */}
                </div>
              </div>
            ) : (
              <label
                id="rigist"
                className="ds-btn ds-btn-primary ds-btn-block gap-1"
                htmlFor="regist-modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg">ลงทะเบียนใช้งาน</span>
              </label>
            )}
            <button
              id="rigist"
              className="ds-btn ds-btn-secondary ds-btn-block gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">ส่งเรื่องถึงกน.</span>
            </button>
            <button
              id="rigist"
              className="ds-btn ds-btn-info ds-btn-sm ds-btn-outline ds-btn-block gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-md">ขั้นตอนการใช้งาน</span>
            </button>
            <button
              id="rigist"
              className="ds-btn ds-btn-error ds-btn-outline ds-btn-sm ds-btn-block gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-md">รายงานปัญหาการใช้งาน</span>
            </button>
            <div className="w-full justify-center items-center text-center text-2xs flex space-x-2">
              <span>MWIT SC Line Bot - V. 20220421.0</span>
            </div>
          </div>
          <input
            type="checkbox"
            id="regist-modal"
            className="ds-modal-toggle"
          />
          <label
            htmlFor="regist-modal"
            className="ds-modal ds-modal-bottom sm:ds-modal-middle cursor-pointer"
          >
            <label className="ds-modal-box relative">
              <h3 className="font-bold text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
                ลงทะเบียนใช้งาน
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-control w-full max-w-full"
              >
                {loginError ? (
                  <>
                    <label className="ds-label"></label>
                    <div className="ds-alert ds-alert-error shadow-lg">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{loginError}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {loginSuccess ? (
                  <>
                    <label className="ds-label"></label>
                    <div className="ds-alert ds-alert-success shadow-lg">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Login Successful!</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <label className="ds-label">
                  กรุณาใส่เลขประจำตัว (เช่น 08888)
                </label>
                <input
                  {...register("studentid")}
                  type="text"
                  placeholder="เลขประจำตัวนักเรียน"
                  className={
                    "ds-input ds-input-bordered w-full max-w-full " +
                    (errors.studentid ? "ds-input-error" : "")
                  }
                />
                <label className="ds-label">
                  <span className="ds-label-text-alt"></span>
                  <span className="ds-label-text-alt text-error">
                    {errors.studentid ? "กรุณาใส่เลขประจำตัว 5 หลัก" : ""}
                  </span>
                </label>
                <button className="ds-btn w-full text-lg" type="submit">
                  ลงทะเบียน
                </button>
              </form>
              {/* <div className="ds-modal-action">
                <label htmlFor="regist-modal" className="btn">
                  Yay!
                </label>
              </div> */}
            </label>
          </label>
        </div>
      ) : (
        <div className="items-center text-center pt-10 space-y-5">
          <div className="w-10 h-10 inline-block rounded-full bg-slate-400 animate-ping"></div>
          <span className="block text-lg">Loading</span>
        </div>
      )}
    </div>
  );
}
