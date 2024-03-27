import NavItems from '../navitems/sidebaritems';
import styles from './sidenav.module.css';
const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <div
      className={`fixed w-full h-full overflow-hidden justify-center grid pt-[120px] left-0 z-10 ${
        isOpen ? styles.splashAnimation : ''
      }`}
      style={{
        top: isOpen ? '0' : '-100%',
      }}
    >
      <div className="absolute top-20 w-full flex- flex-col">
        <NavItems toggle={toggle} />
      </div>
    </div>
  );
};

export default Sidebar;
