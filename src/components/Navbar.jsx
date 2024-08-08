import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { MdRateReview, MdAdd, MdEdit, MdLogout, MdHotel } from "react-icons/md";

export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Menu>
        <MenuHandler>
          <Button variant="text" size="sm" className="flex items-center gap-x-1">
            Account
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <a href="http://localhost:8000/myreview" className="flex items-center gap-2 w-full">
              <MdRateReview />
              My Review
            </a>
          </MenuItem>
          <MenuItem>
            <a href="http://localhost:8000/add" className="flex items-center gap-2 w-full">
              <MdAdd />
              Add Review
            </a>
          </MenuItem>
          <MenuItem>
            <a href="http://localhost:8000/hotels" className="flex items-center gap-2 w-full">
              <MdHotel />
              Hotel Recommendations
            </a>
          </MenuItem>
          <MenuItem>
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full"
            >
              <MdLogout />
              Logout
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="http://localhost:8000/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          TravelTalk
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
  );
}
