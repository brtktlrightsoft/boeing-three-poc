import { useNavigate } from "react-router-dom";

export default function MenuButton() {
    const navigate = useNavigate();
    const navigateMenu = () => {
        // navigate('/menu');
    }
    return (
        <svg className="cursor-pointer fixed top-[5.375rem] right-[4.75rem] z-10" onClick={navigateMenu} xmlns="http://www.w3.org/2000/svg" width="29" height="7" viewBox="0 0 29 7">
            <g id="Group_35" data-name="Group 35" transform="translate(-1765 -58)">
                <circle id="Ellipse_2" data-name="Ellipse 2" cx="3.5" cy="3.5" r="3.5" transform="translate(1765 58)" fill="#fff" />
                <circle id="Ellipse_3" data-name="Ellipse 3" cx="3.5" cy="3.5" r="3.5" transform="translate(1776 58)" fill="#fff" />
                <circle id="Ellipse_4" data-name="Ellipse 4" cx="3.5" cy="3.5" r="3.5" transform="translate(1787 58)" fill="#fff" />
            </g>
        </svg>
    );
}