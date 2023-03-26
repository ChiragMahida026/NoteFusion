import List from "./pages/list/List";
import New from "./pages/new/New";
import { Routes, Route } from "react-router-dom";
import { productInputs } from "./formSource";
import "./style/dark.scss";
import New2 from "./pages/new/New2";
import NewEdit from "./pages/new/NewEdit";

export default function Notes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<List />} />

        <Route
          path="notes/add"
          element={<New inputs={productInputs} title="Add New Service" />}
        />

        <Route
          path="notes/edit"
          element={<NewEdit inputs={productInputs} title="Edit Service" />}
        />

        <Route path="project">
          <Route
            path="/project"
            element={<New2 inputs={productInputs} title="Add New Project" />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

// <Routes>
//   <Route path="/">
//     <Route index element={<Home />} />

//     <Route path="qa">
//       <Route index element={<Listqa />} />
//       {/* <Route path=":userId" element={<Single />} /> */}
//       <Route
//         path="notes/add"
//         element={<Newqa inputs={userInputs} title="Add New Service" />}
//       />
//     </Route>
//     <Route path="dev">
//       <Route index element={<List />} />
//       <Route
//         path="notes/add"
//         element={<New inputs={productInputs} title="Add New Product" />}
//       />
//     </Route>
//   </Route>
// </Routes>;
