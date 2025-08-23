import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import Verify from "./Verify";

const SenkoTheme = {
  card: "w-full px-0 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-10 bg-white shadow-none md:shadow-xl rounded-none md:rounded-2xl relative border-2 border-yellow-300",
  heading: "text-2xl font-bold mb-10 text-orange-500 text-center tracking-tight font-heading",
  label: "block text-orange-700 mb-2 font-medium font-content",
  input: "w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-orange-400 bg-yellow-50 text-lg font-content",
  select: "w-full border border-yellow-300 rounded-lg px-4 py-3 bg-yellow-50 text-lg font-content",
  avatarBox: "w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-300 shadow mb-4",
  avatarBtn: "bg-yellow-200 hover:bg-yellow-300 text-orange-700 px-4 py-2 rounded-full text-sm font-medium shadow font-content",
  changeBtn: "absolute top-6 right-6 bg-orange-400 text-white px-5 py-2 rounded-full shadow hover:bg-orange-500 transition z-10 font-content font-semibold",
  saveBtn: "bg-green-500 text-white px-8 py-3 rounded-full shadow hover:bg-green-600 transition text-lg font-content font-semibold",
  popup: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
  popupCard: "bg-white rounded-xl shadow-lg p-6 relative border-2 border-yellow-300",
  closeBtn: "absolute top-2 right-2 text-orange-400 hover:text-orange-600 text-2xl font-bold cursor-pointer",
};

const PROVINCE_API = "https://provinces.open-api.vn/api/";

const UserInfo = ({ loading, setLoading }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  // State cho địa chỉ
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // Fetch provinces
  useEffect(() => {
    fetch(PROVINCE_API + "p/")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Fetch districts khi chọn province
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict("");
      setWards([]);
      setSelectedWard("");
      return;
    }
    fetch(`${PROVINCE_API}p/${selectedProvince}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts || []);
        setSelectedDistrict("");
        setWards([]);
        setSelectedWard("");
      });
  }, [selectedProvince]);

  // Fetch wards khi chọn district
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard("");
      return;
    }
    fetch(`${PROVINCE_API}d/${selectedDistrict}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards || []);
        setSelectedWard("");
      });
  }, [selectedDistrict]);

  useEffect(() => {
    if (userInfo && provinces.length > 0) {
      if (userInfo.provinceCode) {
        setSelectedProvince(userInfo.provinceCode);
      } else if (userInfo.province) {
        const province = provinces.find((p) => p.name === userInfo.province);
        if (province) setSelectedProvince(province.code);
      }
    }
  }, [userInfo, provinces]);

  useEffect(() => {
    if (userInfo && districts.length > 0) {
      if (userInfo.districtCode) {
        setSelectedDistrict(userInfo.districtCode);
      } else if (userInfo.district) {
        const district = districts.find((d) => d.name === userInfo.district);
        if (district) setSelectedDistrict(district.code);
      }
    }
  }, [userInfo, districts]);

  useEffect(() => {
    if (userInfo && wards.length > 0) {
      if (userInfo.wardCode) {
        setSelectedWard(userInfo.wardCode);
      } else if (userInfo.ward) {
        const ward = wards.find((w) => w.name === userInfo.ward);
        if (ward) setSelectedWard(ward.code);
      }
    }
  }, [userInfo, wards]);

  if (loading || !userInfo)
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-100" style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
        <div className="text-orange-400 text-xl font-content">Loading...</div>
      </div>
    );

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    if (!provinces.length) return;
    const selectedCode = Number(e.target.value);
    const selectedProvinceObj = provinces.find((p) => p.code === selectedCode);
    setUserInfo({
      ...userInfo,
      province: selectedProvinceObj?.name || "",
    });
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    if (!districts.length) return;
    const selectedCode = Number(e.target.value);
    const selectedDistrictObj = districts.find((d) => d.code === selectedCode);
    setUserInfo({
      ...userInfo,
      district: selectedDistrictObj?.name || "",
    });
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    if (!wards.length) return;
    const selectedCode = Number(e.target.value);
    const selectedWardObj = wards.find((w) => w.code === selectedCode);
    setUserInfo({
      ...userInfo,
      ward: selectedWardObj?.name || "",
    });
  };

  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      if (userInfo?.imgURL) {
        await axiosInstance.delete("/api/images/delete", {
          params: { imageUrl: userInfo.imgURL },
        });
      }
      const response = await axiosInstance.post("/api/user/avatar", avatarUrl, {
        headers: { "Content-Type": "text/plain" },
      });
      if (response.status === 200) {
        // Cập nhật lại avatar
        setUserInfo({ ...userInfo, imgURL: avatarUrl });
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post("/api/user/info-update", {
        fullName: userInfo.fullName,
        phoneNum: userInfo.phoneNum,
        province: userInfo.province,
        district: userInfo.district,
        ward: userInfo.ward,
        particular: userInfo.particular,
      });
      if (response.status === 200) {
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleAvatarChange = (url) => {
    handleUpdateAvatar(url);
    setShowImageUploader(false);
  };

  const handleSendVerificationEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `http://localhost:8080/api/send-recovery-code`,
        {
          email: userInfo?.email || "",
        }
      );
      if (response.status === 200) {
        setShowEmailVerification(true);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  const handleVerified = () => {
    setShowEmailVerification(false);
    setEditMode(true);
  };

  return (
    <div className={SenkoTheme.card} style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
      <button
        className={SenkoTheme.changeBtn}
        onClick={handleSendVerificationEmail}
        disabled={editMode}
      >
        Thay đổi
      </button>
      <h2 className={SenkoTheme.heading}>
        <img
          src="/Senko.png"
          alt="Senko Fox"
          className="inline-block w-10 h-10 rounded-full border-2 border-yellow-300 shadow mr-2 align-middle"
        />
        Thông tin cá nhân
      </h2>
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start w-full">
        {/* Avatar + nút đổi hình */}
        <div className="flex flex-col items-center md:items-start w-40 min-w-[160px]">
          <div className={SenkoTheme.avatarBox}>
            <img
              src={userInfo?.imgURL}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className={SenkoTheme.avatarBtn}
            onClick={() => setShowImageUploader(true)}
          >
            Đổi hình
          </button>
        </div>
        {/* Form thông tin */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 w-full">
          <div>
            <label className={SenkoTheme.label}>Username</label>
            <input
              type="text"
              name="username"
              className={SenkoTheme.input}
              value={userInfo?.username || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Chưa có username"
            />
          </div>
          <div>
            <label className={SenkoTheme.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              className={SenkoTheme.input}
              value={userInfo?.fullName || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Chưa có họ tên"
            />
          </div>
          <div className="md:col-span-2">
            <label className={SenkoTheme.label}>Email</label>
            <input
              type="email"
              name="email"
              className={SenkoTheme.input}
              value={userInfo?.email || ""}
              onChange={handleChange}
              disabled
              placeholder="Chưa có email"
            />
          </div>
          <div className="md:col-span-2">
            <label className={SenkoTheme.label}>Phone</label>
            <input
              type="text"
              name="phoneNum"
              className={SenkoTheme.input}
              value={userInfo?.phoneNum || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Chưa có số điện thoại"
            />
          </div>
          <div>
            <label className={SenkoTheme.label}>Tỉnh/Thành phố</label>
            <select
              className={SenkoTheme.select}
              value={selectedProvince}
              onChange={handleProvinceChange}
              disabled={!editMode}
            >
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={SenkoTheme.label}>Quận/Huyện</label>
            <select
              className={SenkoTheme.select}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!editMode || !selectedProvince}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={SenkoTheme.label}>Phường/Xã</label>
            <select
              className={SenkoTheme.select}
              value={selectedWard}
              onChange={handleWardChange}
              disabled={!editMode || !selectedDistrict}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((w) => (
                <option key={w.code} value={w.code}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={SenkoTheme.label}>Địa chỉ chi tiết</label>
            <input
              type="text"
              name="addressDetail"
              className={SenkoTheme.input}
              value={userInfo?.particular || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Số nhà, tên đường, tòa nhà, v.v."
            />
          </div>
          {editMode && (
            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                className={SenkoTheme.saveBtn}
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          )}
        </form>
      </div>
      {/* Popup ImageUploader */}
      {showImageUploader && (
        <div className={SenkoTheme.popup}>
          <div className={SenkoTheme.popupCard}>
            <button
              className={SenkoTheme.closeBtn}
              onClick={() => setShowImageUploader(false)}
            >
              &times;
            </button>
            <ImageUploader onImageUpload={handleAvatarChange} />
          </div>
        </div>
      )}
      {/* Popup EmailVerification */}
      {showEmailVerification && (
        <div className={SenkoTheme.popup}>
          <div className={SenkoTheme.popupCard}>
            <button
              className={SenkoTheme.closeBtn}
              onClick={() => setShowEmailVerification(false)}
            >
              &times;
            </button>
            <Verify email={userInfo?.email} handleVerified={handleVerified} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;