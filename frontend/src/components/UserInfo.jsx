import React, { useState, useEffect, use } from "react";
import ImageUploader from "../components/ImageUploader";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import Verify from "./Verify";
import { set } from "date-fns";

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
    // Nếu backend trả về code
    if (userInfo.provinceCode) {
      setSelectedProvince(userInfo.provinceCode);
    }
    // Nếu backend trả về tên
    else if (userInfo.province) {
      const province = provinces.find(
        (p) => p.name === userInfo.province
      );
      if (province) setSelectedProvince(province.code);
    }
  }
}, [userInfo, provinces]);

useEffect(() => {
  if (userInfo && districts.length > 0) {
    if (userInfo.districtCode) {
      setSelectedDistrict(userInfo.districtCode);
    } else if (userInfo.district) {
      const district = districts.find(
        (d) => d.name === userInfo.district
      );
      if (district) setSelectedDistrict(district.code);
    }
  }
}, [userInfo, districts]);

useEffect(() => {
  if (userInfo && wards.length > 0) {
    if (userInfo.wardCode) {
      setSelectedWard(userInfo.wardCode);
    } else if (userInfo.ward) {
      const ward = wards.find(
        (w) => w.name === userInfo.ward
      );
      if (ward) setSelectedWard(ward.code);
    }
  }
}, [userInfo, wards]);

  if (loading || !userInfo) return <div>Loading...</div>;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    if (!provinces.length) return; // Tránh lỗi nếu provinces chưa được tải
    const selectedCode = Number(e.target.value); // ép về number
    const selectedProvinceObj = provinces.find(
      (p) => p.code === selectedCode
    );
    setUserInfo({
      ...userInfo,
      province: selectedProvinceObj?.name || "",
    });
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    if (!districts.length) return; // Tránh lỗi nếu districts chưa được tải
    const selectedCode = Number(e.target.value);
    const selectedDistrictObj = districts.find(
      (d) => d.code === selectedCode
    );
    setUserInfo({
      ...userInfo,
      district: selectedDistrictObj?.name || "",
    });
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    console.log("Selected ward:", e.target.value);
    if (!wards.length) return; // Tránh lỗi nếu wards chưa được tải
    const selectedCode = Number(e.target.value);
    const selectedWardObj = wards.find(
      (w) => w.code === selectedCode
    );
    setUserInfo({
      ...userInfo,
      ward: selectedWardObj?.name || "",
    });
  };

  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      if (userInfo?.imgURL) {
        const response = await axiosInstance.delete("/api/images/delete", {
          params: { imageUrl: userInfo.imgURL },
        });
      }
      const response = await axiosInstance.post("/api/user/avatar", avatarUrl, {
        headers: { "Content-Type": "text/plain" },
      });
      if (response.status === 200) {
        console.log("Avatar updated successfully");
      } else {
        console.error("Failed to update avatar");
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
        console.log("User info updated successfully");
      } else {
        console.error("Failed to update user info");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleAvatarChange = (url) => {
    console.log("Avatar updated:", url);
    handleUpdateAvatar(url);
    // Đóng popup sau khi cập nhật avatar
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
        console.log("Verification email sent successfully");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      // Handle error, e.g., show a toast notification
    }
  };

  const handleVerified = () => {
    setShowEmailVerification(false);
    setEditMode(true);
  };

  return (
    <div className="w-full px-0 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-10 bg-white shadow-none md:shadow-lg rounded-none md:rounded-2xl relative">
      {/* Nút thay đổi */}
      <button
        className="absolute top-6 right-6 bg-blue-500 text-white px-5 py-2 rounded-full shadow hover:bg-blue-600 transition z-10"
        onClick={handleSendVerificationEmail}
        disabled={editMode}
      >
        Thay đổi
      </button>
      <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center tracking-tight">
        Thông tin cá nhân
      </h2>
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start w-full">
        {/* Avatar + nút đổi hình */}
        <div className="flex flex-col items-center md:items-start w-40 min-w-[160px]">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow mb-4">
            <img
              src={userInfo?.imgURL || "/images/default-avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow"
            onClick={() => setShowImageUploader(true)}
          >
            Đổi hình
          </button>
        </div>
        {/* Form thông tin */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 w-full">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-blue-400 bg-gray-50 text-lg"
              value={userInfo?.username || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Chưa có username"
            />
          </div>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-blue-400 bg-gray-50 text-lg"
              value={userInfo?.fullName || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Chưa có họ tên"
            />
          </div>
          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-blue-400 bg-gray-50 text-lg"
              value={userInfo?.email || ""}
              onChange={handleChange}
              disabled // Email không cho sửa trực tiếp
              placeholder="Chưa có email"
            />
          </div>
          {/* Phone */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Phone
            </label>
            <input
              type="text"
              name="phoneNum"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-blue-400 bg-gray-50 text-lg"
              value={userInfo?.phoneNum || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Chưa có số điện thoại"
            />
          </div>

          {/* Địa chỉ: Tỉnh/Thành */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Tỉnh/Thành phố
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-lg"
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

          {/* Địa chỉ: Quận/Huyện */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Quận/Huyện
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-lg"
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

          {/* Địa chỉ: Phường/Xã */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Phường/Xã
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-lg"
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
          {/* Địa chỉ chi tiết */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Địa chỉ chi tiết
            </label>
            <input
              type="text"
              name="addressDetail"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-blue-400 bg-gray-50 text-lg"
              value={userInfo?.particular || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Số nhà, tên đường, tòa nhà, v.v."
            />
          </div>
          {/* Nút lưu */}
          {editMode && (
            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                className="bg-green-500 text-white px-8 py-3 rounded-full shadow hover:bg-green-600 transition text-lg"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
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
