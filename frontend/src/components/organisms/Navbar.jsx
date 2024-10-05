import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../../util/http-commons';
import {
  login,
  logout,
  demoLogin,
  demoLogout,
} from '../../store/actions/authActions';
import {
  StyledNavbar,
  LeftContainer,
  RightContainer,
  NavLink,
  ProfileImage,
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  LogoutButton,
  LogoImage,
  Letter,
} from '../styles/NavbarStyles';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // ?. 연산자를 사용하여 null 체크
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  console.log('isAuthenticated:', isAuthenticated); // 상태가 변경될 때마다 출력 확인
  console.log('user:', user); // 상태가 변경될 때마다 출력 확인

  const instance = Axios();

  // 로그아웃 핸들러: 로그아웃 액션을 디스패치하여 상태를 변경합니다.
  const handleLogout = async () => {
    try {
      await instance.get('/member/signout'); // 서버에 로그아웃 요청 (GET 요청으로 변경)
      dispatch(logout()); // Redux 상태에서 사용자 정보 제거
      navigate('/'); // 메인 페이지로 리디렉션
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  // 드롭다운 토글
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const text = 'Login';

  return (
    <StyledNavbar>
      <LeftContainer>
        <Link to='/'>
          <LogoImage
            src='/logo.png'
            alt='Logo'
            whileHover={{ scale: 1.1 }} // 마우스를 올리면 크기가 10% 커짐
            transition={{ duration: 0.3 }}
          />
        </Link>
      </LeftContainer>
      <RightContainer>
        {isAuthenticated ? (
          <>
            <NavLink to='/practice'>Start</NavLink>
            <DropdownContainer>
              <DropdownButton onClick={toggleDropdown}>
                <ProfileImage
                  src={
                    user && user.memberPicture
                      ? 'https://i11b207.p.ssafy.io/uploads' +
                        user.memberPicture
                      : '/default-profile.jpg'
                  }
                  alt='Profile'
                  whileHover={{ scale: 1.1 }} // 마우스를 올리면 크기가 10% 커짐
                  transition={{ duration: 0.3 }}
                />
              </DropdownButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem to='/myinfo'>내 정보</DropdownItem>
                  <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </DropdownMenu>
              )}
            </DropdownContainer>
          </>
        ) : (
          <>
            <NavLink to='/login'>
              {text.split('').map((letter, index) => (
                <Letter
                  key={index}
                  initial={{ y: '100%', opacity: 0 }} // 시작 위치와 불투명도
                  animate={{ y: '0%', opacity: 1 }} // 애니메이션 후 위치와 불투명도
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {letter}
                </Letter>
              ))}
            </NavLink>
          </>
        )}
      </RightContainer>
    </StyledNavbar>
  );
}

export default Navbar;
