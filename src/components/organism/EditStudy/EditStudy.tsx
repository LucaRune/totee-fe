import { SelectAPI } from '@api/api';
import { useAddPost } from '@hooks/usePostQuery';
import { UserState } from '@store/user';
import { createHashHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Editor, Select } from '@components/common';
import studypageIcon from '../../../assets/studyPageIcon.png';
import dashedLine from '../../../assets/dashedLine.png';
import './editStudy.scss';

import {IPostDetailType} from 'types/post.types';

// 클릭한 값 보여주기
interface IEditStudyPagePropsType{
    type: "create" | "edit";
    initialData? : IPostDetailType
}

export function EditStudyPage({type, initialData}:IEditStudyPagePropsType) {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(UserState);
  const [values, setValues] = useState({
    categoryName: '',
    contactLink: '',
    contactMethod: '',
    content: '',
    onlineOrOffline: '',
    period: '',
    positionList: '',
    recruitNum: '',
    status: '모집중',
    title: '',
  });
  const [title, setTitle] = useState('');

  useEffect(()=>{
    if(type === "edit" && initialData){
        setValues({
            categoryName: initialData?.categoryName,
            contactLink: initialData?.contactLink,
            contactMethod: initialData?.contactMethod,
            content: initialData?.content,
            onlineOrOffline: initialData?.onlineOrOffline,
            period: initialData?.period,
            positionList: initialData?.positionList.join(','),
            recruitNum: initialData?.recruitNum,
            status: initialData?.status,
            title: initialData?.title,
        })
        setTitle(initialData?.title,)
    }
  },[type,initialData])


  //select
  const sort: any = ['스터디', '프로젝트', '동아리', '멘토멘티'];
  const people: any = ['제한없음', '1~2명', '3~5명', '5명이상'];
  const area: any = [
    '프론트엔드',
    '백엔드',
    'ML',
    '게임',
    '안드로이드',
    'iOS',
    '디자인',
    '기타',
  ];
  const process: any = ['온라인', '오프라인'];
  const duration: any = ['1개월미만', '1~3개월', '3~6개월', '6개월이상'];
  const contact: any = ['카카오톡 오픈채팅', '이메일', '노션', '기타'];

  const select = [sort, process, people, duration, area, contact];
  const variable = [
    '모집구분',
    '진행방식',
    '모집인원',
    '진행기간',
    '모집분야',
    '연락방식',
  ];
  const [isChecked, setIsChecked] = useState([]);
  const [link, setLink] = useState('');
  // }

  const cancelClick = (e: any) => {
    const checking = isChecked.filter((arr) => {
      if (arr !== e.target.id) {
        return arr;
      }
    });
    setIsChecked(checking);
  };

  const linkChange = (e: any) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    setValues({
      ...values,
      ['positionList']: isChecked.join(','),
    });
  }, [isChecked]);

  useEffect(() => {
    setValues({
      ...values,
      ['contactLink']: link,
    });
  }, [link]);

  useEffect(() => {
    setValues({
      ...values,
      ['title']: title,
    });
  }, [title]);

  const Categories = () => {
    const maping = select.map((arr: any, i: any) => {
      return (
        <div className="category_label_wrapper">
          <div className="category_label">
            <span>{variable[i]}</span>
          </div>
          <Select
            values={values}
            setValues={setValues}
            optionData={arr}
            variable={variable[i]}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          {i === 4 ? (
            <div className="checked_wrapper">
              {isChecked.map((arr) => {
                return (
                  <div className="checked_item">
                    <div className="select_item">{arr}</div>
                    <div
                      className="checked_cancel"
                      onClick={cancelClick}
                      id={arr}
                    >
                      x
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {i === 5 ? (
            <input
              className="contact_link"
              placeholder="사용하실 연락 방식의 링크를 입력해주세요."
              onChange={linkChange}
            />
          ) : null}
        </div>
      );
    });
    return maping;
  };

  //취소버튼 클릭시
  const handlerCancelClick = () => {
    navigate('/');
  };

  //업로드 버튼
  const addPostMutation = useAddPost();

  const onClickUploadButton = async () => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    const result = await addPostMutation.mutateAsync(formData);
    if (result.status == 200) {
      console.log('성공');
      setValues({
        categoryName: '',
        contactLink: '',
        contactMethod: '',
        content: '',
        onlineOrOffline: '',
        period: '',
        positionList: '',
        recruitNum: '',
        status: 'Y',
        title: '',
      });
      document.location.href = '/';
    } else {
      console.log('실패');
    }
  };

  return (
    <div className="studypage_container">
      <div
        className="studypage_profile"
        style={{ backgroundImage: `url("${user.profileImageUrl}")` }}
      ></div>
      <div className="category_container">
        <div className="studypage_icon">
          <img src={studypageIcon}></img>
        </div>
        <div className="category_title">
          <div className="category_title_text">
            <span>개설하려는 스터디의 기본 정보를 입력해주세요.</span>
          </div>
          <div className="category_title_line"></div>
        </div>
        <div className="category_content_line">
          <img src={dashedLine} />
        </div>
        <div className="category_content_wrapper">{Categories()}</div>
      </div>
      <div className="category_title_text">
        <span>개설하려는 스터디에 대해 소개해주세요.</span>
      </div>
      <div className="category_title_line"></div>
      <div className="title_title">제목</div>
      <input
        className="title_input"
        type="text"
        value={title}
        placeholder="제목을 입력해주세요."
        onChange={(e)=>setTitle(e.target.value)}
      />
      <Editor values={values} setValues={setValues} />
      <div className="button_container">
        <button
          className="upload_button"
          type="submit"
          onClick={onClickUploadButton}
        >
          글 올리기
        </button>
        <button className="cancel_button" onClick={handlerCancelClick}>
          취소
        </button>
      </div>
    </div>
  );
}
