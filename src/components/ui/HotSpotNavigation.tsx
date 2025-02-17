import { useEffect } from "react";
import { useCameraStore } from "../../store/cameraStore";
import { useProductStore } from "../../store/productStore";

export function HotSpotNavigation() {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore(
    (state) => state.currentHotspotIndex
  );
  const setCurrentHotspotIndex = useProductStore(
    (state) => state.setCurrentHotspotIndex
  );
  const updateCameraPosition = useCameraStore(
    (state) => state.updateCameraPosition
  );
  const updateCameraTarget = useCameraStore(
    (state) => state.updateCameraTarget
  );

  const nextHotspot = () => {
    setCurrentHotspotIndex(
      (currentHotspotIndex + 1) % (product?.hotspots.length ?? 1)
    );
  };
  const previousHotspot = () => {
    setCurrentHotspotIndex(
      (currentHotspotIndex - 1 + (product?.hotspots.length ?? 1)) %
      (product?.hotspots.length ?? 1)
    );
  };
  // onClick handlers for the buttons (functionality to be added)
  const handleLeftClick = () => {
    previousHotspot();
  };

  const handleRightClick = () => {
    nextHotspot();
  };

  useEffect(() => {
    const newPosition = product?.hotspots[currentHotspotIndex].cameraPosition;
    const newTarget = product?.hotspots[currentHotspotIndex].cameraTarget;
    if (newPosition && newTarget) {
      updateCameraPosition(newPosition);
      updateCameraTarget(newTarget);
    }
  }, [currentHotspotIndex, product, updateCameraPosition, updateCameraTarget]);

  // Styling for circular buttons
  const buttonStyle: React.CSSProperties = {
    position: "relative",
    width: "60px",
    height: "60px",
    borderRadius: "100%",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10px",
  };
  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "200px",
  };
  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%,-55%)",
    left: "50%",
  };

  return (
    <div style={wrapperStyle}>
      <div style={buttonStyle} onClick={handleLeftClick}>
        <span style={arrowStyle}>
          {"<"}
        </span>
      </div>
      <div style={buttonStyle} onClick={handleRightClick}>
        <span style={arrowStyle}>
          {">"}
        </span>

      </div>
    </div>
  );
}
