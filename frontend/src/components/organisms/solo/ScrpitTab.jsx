import RegisterScriptTab from './RegisterScrpitTab';
import SelectScriptTab from './SelectScriptTab';
import { useSelector } from 'react-redux';

const ScriptTab = () => {
  let isSelectScriptTab = useSelector((state) => state.room.isSelectScriptTab);
  return (
    <>{!isSelectScriptTab ? <RegisterScriptTab /> : <SelectScriptTab />}</>
  );
};

export default ScriptTab;
