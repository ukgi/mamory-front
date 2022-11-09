import DiaryNavBar from "../diaryNavBar/DiaryNavBar";
import "./write.css";

export default function Write() {
  return (
    <>
      <DiaryNavBar />
      <div className='write'>
        <img
          className='writeImg'
          src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
          alt=''
        />
        <form className='writeForm'>
          <div className='writeFormGroup'>
            <label htmlFor='fileInput'>
              <i className='writeIcon fas fa-plus'></i>
            </label>
            <input id='fileInput' type='file' style={{ display: "none" }} />
            <input
              className='writeInput'
              placeholder='Title'
              type='text'
              autoFocus={true}
            />
          </div>
          <div className='writeFormGroup'>
            <textarea
              className='writeInput writeText'
              placeholder='당신의 이야기를 적어주세요'
              type='text'
              autoFocus={true}
            />
          </div>
          <button className='writeSubmit' type='submit'>
            사진 올리기
          </button>
        </form>
      </div>
    </>
  );
}
