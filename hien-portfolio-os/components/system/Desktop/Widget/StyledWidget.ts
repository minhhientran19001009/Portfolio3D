import styled from "styled-components";

const StyledWidget = styled.div`
  background-color: rgba(25, 35, 45, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  box-shadow: inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #ffffff;
  color: #ffffff;
  font-family: "Tahoma", "MS Sans Serif", -apple-system, sans-serif;
  font-size: 11px;
  padding: 8px;
  position: absolute;
  right: 24px;
  top: 24px;
  width: 240px;
  z-index: 0;
  user-select: none;
  pointer-events: auto;

  .widget-header {
    border-bottom: 2px groove #dfdfdf;
    padding-bottom: 4px;
    margin-bottom: 8px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 9px;
    color: #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span.active-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #00ff00;
      border-radius: 50%;
      box-shadow: 0 0 4px #00ff00;
      animation: blink 2s infinite;
    }
  }

  .widget-section {
    border: 1px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    box-shadow: inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #ffffff;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .time-display {
    font-size: 26px;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
    letter-spacing: 1px;
  }

  .date-display {
    text-align: center;
    margin-top: 4px;
    font-size: 10px;
    color: #dfdfdf;
  }

  .weather-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .weather-left {
      display: flex;
      flex-direction: column;
      
      .location {
        font-weight: bold;
        color: #ffffff;
        font-size: 11px;
      }
      .condition {
        color: #dfdfdf;
        font-size: 10px;
        margin-top: 2px;
      }
    }

    .weather-right {
      display: flex;
      align-items: center;
      
      .temp {
        font-size: 22px;
        font-weight: bold;
        font-family: "Courier New", monospace;
        margin-right: 6px;
      }

      .weather-icon {
        font-size: 24px;
        display: inline-block;
        animation: float 3s ease-in-out infinite;
      }
    }
  }

  .weather-details {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    border-top: 1px dashed rgba(255, 255, 255, 0.15);
    padding-top: 4px;
    font-size: 9px;
    color: #b0b0b0;
  }

  .stat-row {
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }

    .stat-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
      font-size: 10px;
      color: #dfdfdf;

      span.val {
        font-family: "Courier New", monospace;
        color: #ffffff;
        font-weight: bold;
      }
    }

    .progress-bar {
      height: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid;
      border-color: #808080 #dfdfdf #dfdfdf #808080;
      position: relative;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background-color: #008080;
        transition: width 0.5s ease-out;
      }
    }
  }

  .uptime-display {
    text-align: center;
    font-size: 9px;
    color: #b0b0b0;
    margin-top: 4px;
    font-family: "Courier New", monospace;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
`;

export default StyledWidget;
