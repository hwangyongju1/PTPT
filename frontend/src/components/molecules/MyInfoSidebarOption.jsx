import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &.active {
    background-color: #e0e0e0;
    font-weight: bold;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Icon = styled.span`
  font-size: 20px;
`;

const Label = styled.span`
  font-size: 16px;
`;

const MyInfoSidebarOption = ({ to, icon, children }) => {
  return (
    <StyledNavLink
      to={to}
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <Option>
        <Icon>{icon}</Icon>
        <Label>{children}</Label>
      </Option>
    </StyledNavLink>
  );
};

export default MyInfoSidebarOption;
