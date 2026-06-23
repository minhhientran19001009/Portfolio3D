import styled from "styled-components";

const StyledUniKey = styled.div`
  background-color: #d4d0c8;
  color: #000;
  display: flex;
  flex-direction: column;
  font-family: Tahoma, "MS Sans Serif", sans-serif;
  font-size: 11px;
  height: 100%;
  padding: 10px;
  user-select: none;
  width: 100%;

  .main-section {
    display: flex;
    gap: 12px;
    margin-bottom: 10px;
  }

  .controls-group {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
  }

  .form-row {
    align-items: center;
    display: flex;
    gap: 8px;

    label {
      font-weight: bold;
      min-width: 60px;
    }

    select {
      background-color: #fff;
      border: 2px inset #ffffff;
      font-family: Tahoma, sans-serif;
      font-size: 11px;
      height: 21px;
      outline: none;
      padding: 1px 2px;
      width: 150px;
    }
  }

  .buttons-sidebar {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 85px;
  }

  .win98-button {
    background-color: #d4d0c8;
    border: 2px outset #ffffff;
    box-shadow: 1px 1px 0px #000;
    color: #000;
    cursor: default;
    font-size: 11px;
    height: 23px;
    outline: none;
    padding: 2px 6px;
    text-align: center;
    width: 100%;

    &:active {
      border: 2px inset #ffffff;
      box-shadow: none;
      padding: 3px 5px 1px 7px;
    }

    &.primary {
      font-weight: bold;
    }
  }

  .group-box {
    border: 2px groove #ffffff;
    margin-top: 10px;
    padding: 12px 10px;
    position: relative;

    .group-title {
      background-color: #d4d0c8;
      font-weight: bold;
      left: 10px;
      padding: 0 4px;
      position: absolute;
      top: -8px;
    }

    .options-grid {
      display: grid;
      gap: 6px 12px;
      grid-template-columns: repeat(2, 1fr);
    }

    .checkbox-label {
      align-items: center;
      display: flex;
      gap: 6px;

      input {
        cursor: default;
        margin: 0;
      }
    }
  }

  .footer-status {
    border-top: 1px solid #808080;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 6px;
    color: #404040;
  }

  .about-overlay {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;

    .about-dialog {
      background-color: #d4d0c8;
      border: 2px outset #ffffff;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      padding: 12px;
      width: 270px;

      .about-title {
        border-bottom: 2px groove #ffffff;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 8px;
        padding-bottom: 4px;
        text-align: center;
      }

      .about-text {
        font-size: 11px;
        line-height: 1.4;
        margin-bottom: 12px;
      }

      .about-ok-btn {
        align-self: center;
        width: 75px;
      }
    }
  }
`;

export default StyledUniKey;
