import {
  ArrowLeftOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { message, Tag, Tooltip, Upload, Select, Input, Button } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MyButton from "../../elements/button/MyButton";
import { getToken, getUser } from "../../utils/Common";
import "./CreatePicture.css";

const { Option } = Select;

export default function CreatePicture() {
  const navigate = useNavigate();
  const [postDesignCreate, setPostDesignCreate] = useState({
    id: 0,
    title: "",
    description: "",
    loveCount: 0,
    urlPicture: null,
    urlDesign: null,
    tags: [],
    price: 0,
  });

  const [alltag, setAlltag] = useState([]);
  const [listFollow, setListFollow] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllTags = async () => {
    const res = await axios.get("/tags/getAllTags");
    setAlltag(res.data);
  };

  const getListFollow = async () => {
    const res = await axios.get(
      `/follow/getAllFollowerOfUser?username=${"thangvt2"}`
    );
    setListFollow(res.data);
  };

  useEffect(() => {
    getAllTags();
    getListFollow();
  }, []);

  const onChangeTag = (value) => {
    setPostDesignCreate({
      ...postDesignCreate,
      tags: value,
    });
  };

  const beforeUploadImage = (file) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(`${file.name} is not a image file`);
    }
    return file.type === "image/png" || file.type === "image/jpeg"
      ? true
      : Upload.LIST_IGNORE;
  };

  const handleChangeInput = (e) => {
    setPostDesignCreate({
      ...postDesignCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = ({ file }) => {
    setPostDesignCreate({
      ...postDesignCreate,
      urlPicture: file.originFileObj,
    });
  };

  const handleChangeFile = ({ file }) => {
    setPostDesignCreate({
      ...postDesignCreate,
      urlDesign: file.originFileObj,
    });
  };

  const onCreateNewPicture = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("titlePost", postDesignCreate.title);
    formData.append("descriptionPost", postDesignCreate.description);
    formData.append("urlDesign", postDesignCreate.urlDesign);
    formData.append("urlPicture", postDesignCreate.urlPicture);
    formData.append("price", postDesignCreate.price);
    postDesignCreate.tags.map((tag) => formData.append("tags", tag));
    const res = await axios.post("/post/addPost", formData, {
      headers: {
        Authorization: `Beaser ${getToken()}`,
      },
    });
    if (res.status === 200 && res.statusText === "OK") {
      setTimeout(() => {
        setLoading(false);
        message.success("T???o Design m???i th??nh c??ng !");
        navigate("/");
      }, 10000);
    }
  };

  return (
    <div className="py-5">
      <div className="create-picture mx-auto">
        <div className="flex flex-row items-center justify-between mb-2">
          <ArrowLeftOutlined
            className="text-xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1>T???o m???i Design</h1>
          <MyButton
            className="btn-red"
            onClick={onCreateNewPicture}
            disabled={loading}
          >
            {loading ? "??ang t???o..." : "T???o m???i"}
          </MyButton>
        </div>
        <form className="flex flex-row">
          <div className="upload-create flex-1 mr-5 flex items-center justify-center">
            {postDesignCreate.urlPicture ? (
              <img
                src={URL.createObjectURL(postDesignCreate.urlPicture)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload
                className="text-center"
                onChange={handleChange}
                showUploadList={false}
                beforeUpload={beforeUploadImage}
              >
                <UploadOutlined />
                <p>Nh???p v??o ????y ????? t???i l??n ???nh mi??u t???</p>
              </Upload>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-row items-center mb-3">
              <img
                src={getUser().urlProfilePicture}
                alt=""
                style={{ height: 40, width: 40 }}
                className="mr-3 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="m-0 font-bold">{getUser().fullname}</h3>
                <p className="m-0">{listFollow?.length} ng?????i theo d??i</p>
              </div>
            </div>
            <label htmlFor="newTitle">Ti??u ?????</label>
            <input
              className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newTitle"
              type="text"
              placeholder="Nh???p ti??u ?????"
              name="title"
              value={postDesignCreate.title}
              onChange={handleChangeInput}
            />
            <label htmlFor="newDesciption">Mi??u t???</label>
            <textarea
              className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newDesciption"
              placeholder="Nh???p mi??u t???"
              rows="6"
              name="description"
              value={postDesignCreate.description}
              onChange={handleChangeInput}
            />
            <label htmlFor="newTag">Tag</label>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
              onChange={onChangeTag}
            >
              {alltag.map((tag) => (
                <Option key={tag}>{tag}</Option>
              ))}
            </Select>
            <br />
            <div className="mb-3"></div>
            <label htmlFor="newDesciption">Upload Design</label>
            <br />
            <Upload onChange={handleChangeFile}>
              <MyButton icon={<UploadOutlined />} className="btn-red mt-2">
                Upload
              </MyButton>
            </Upload>
            <div className="text-gray-400 mt-2">
              L??u ??, b???n c?? th??? upload file n??n, ai, psd, ...
            </div>
            <div>Gi?? c???: {postDesignCreate.price}??</div>
            <div className="flex flex-row">
              <Input
                placeholder="??i???n gi??"
                value={postDesignCreate.price}
                prefix={<strong>VN??</strong>}
                onChange={(e) =>
                  setPostDesignCreate({
                    ...postDesignCreate,
                    price: e.target.value,
                  })
                }
              />
              <Button
                type="primary"
                className="ml-3"
                onClick={() =>
                  setPostDesignCreate({ ...postDesignCreate, price: 0 })
                }
              >
                Free
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
