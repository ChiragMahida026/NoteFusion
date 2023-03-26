import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-3">
            <div class="form-group mt-3 mb-3">
              <label for="defData">Select Factor</label>
              <select class="form-control" id="defData">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div id="lowData" class="form-group mt-3 mb-3">
              <label for="defData">Select Factor</label>
              <select class="form-control" id="defLow" multiple="multiple">
                <option value="shrinkage" selected="selected">
                  Shrinkage
                </option>
                <option value="mottling" selected="selected">
                  Mottling
                </option>
                <option value="spittage" selected="selected">
                  Spittage
                </option>
                <option value="blister" selected="selected">
                  Blister
                </option>
              </select>
            </div>
            <div id="midData" class="form-group mt-3 mb-3" hidden>
              <label for="defMid">Select Factor</label>
              <select class="form-control" id="defMid" multiple="multiple">
                <option value="pdrop" selected="selected">
                  Paint Drop
                </option>
                <option value="dspray" selected="selected">
                  Dry Spray
                </option>
                <option value="rbdown" selected="selected">
                  Robot Rundown
                </option>
                <option value="opeel" selected="selected">
                  Orange Peel
                </option>
                <option value="popping" selected="selected">
                  Popping
                </option>
              </select>
            </div>
            <div id="highData" class="form-group mt-3 mb-3" hidden>
              <label for="defHig">Select Factor</label>
              <select class="form-control" id="defHig" multiple="multiple">
                <option value="dust" selected="selected">
                  Dust
                </option>
                <option value="lint" selected="selected">
                  Lint
                </option>
                <option value="mrd" selected="selected">
                  Manual Rundown
                </option>
              </select>
            </div>
          </div>
          <div class="col-3"></div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <canvas id="myChart"></canvas>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    </>
  );
};

export default Featured;
