import React, { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import turkeyGeoJson from '../data/turkey-provinces.json';

interface CustomTurkeyMapProps {
  colorData?: Record<string, string>;
  tooltipData?: Record<string, string>;
  showTooltip?: boolean;
}

export const CustomTurkeyMap: React.FC<CustomTurkeyMapProps> = ({
  colorData = {},
  tooltipData = {},
  showTooltip = true,
}) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // D3 Geo Projection for Turkey Focus (Auto scales to fit the entire viewBox perfectly)
  const projection = useMemo(() => {
    return geoMercator().fitSize([800, 400], turkeyGeoJson as any);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection as any), [projection]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
      >
        {[...turkeyGeoJson.features].sort((a: any, b: any) => {
          // Hovered city must be rendered last to appear on top of adjacent borders
          const plateA = String(a.properties?.number || a.properties?.plate || '').padStart(2, '0');
          const plateB = String(b.properties?.number || b.properties?.plate || '').padStart(2, '0');
          if (plateA === hoveredCity) return 1;
          if (plateB === hoveredCity) return -1;
          return 0;
        }).map((feature: any, index: number) => {
          let plate = '';
          if (feature.properties) {
            plate = String(feature.properties.number || feature.properties.plate || '').padStart(2, '0');
          }
          
          const fillColor = colorData[plate] || '#cbd5e1';
          const isHovered = hoveredCity === plate;

          let count = 0;
          if (tooltipData[plate]) {
            const match = tooltipData[plate].match(/: (\d+) Katılımcı/);
            if (match) count = parseInt(match[1], 10);
          }

          let cx = 0, cy = 0;
          try {
            const centroid = pathGenerator.centroid(feature);
            if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
              cx = centroid[0];
              cy = centroid[1];
            }
          } catch(e) {}

          const hasCentroid = cx !== 0 && cy !== 0;
          const cityName = feature.properties?.name || '';

          return (
            <path
              key={`path-${plate || index}`}
              d={pathGenerator(feature) || ''}
              fill={fillColor}
              stroke={isHovered ? "#000000" : "white"}
              strokeWidth={isHovered ? 2.5 : 0.5}
              strokeLinejoin="round"
              className={isHovered ? "transition-none cursor-pointer outline-none relative" : "transition-colors duration-300 cursor-pointer outline-none hover:brightness-95 relative"}
              onMouseEnter={() => setHoveredCity(plate)}
              onMouseLeave={() => setHoveredCity(null)}
              onMouseMove={handleMouseMove}
              style={isHovered ? { filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.5))' } : {}}
            />
          );
        })}
      </svg>

      {/* Modern High-End Floating Tooltip */}
      {showTooltip && hoveredCity && (
        <div
          className="fixed z-[999] pointer-events-none transform -translate-x-1/2 -translate-y-[130%] flex flex-col items-center"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          <div className="bg-white/90 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-6 py-4 rounded-3xl min-w-[160px] flex flex-col gap-1 items-center justify-center animate-in zoom-in-95 fade-in duration-200">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{turkeyGeoJson.features.find((f: any) => String(f.properties?.number || f.properties?.plate).padStart(2, '0') === hoveredCity)?.properties?.name || 'Bilinmiyor'}</span>
            {tooltipData[hoveredCity] && tooltipData[hoveredCity].match(/\d+/) ? (
              <span className="text-2xl font-black text-indigo-600 leading-none drop-shadow-sm">
                {parseInt(tooltipData[hoveredCity].match(/\d+/)?.[0] || '0', 10)} <span className="text-xs font-bold text-indigo-400/80 tracking-tight lowercase">kişi</span>
              </span>
            ) : (
              <span className="text-sm font-bold text-slate-400">Katılım Yok</span>
            )}
          </div>
      {/* Tooltip Arrow Element */}
          <div className="w-5 h-5 bg-white/90 backdrop-blur-2xl border-b border-r border-white absolute -bottom-2 transform rotate-45 shadow-[4px_4px_10px_rgba(0,0,0,0.05)]"></div>
        </div>
      )}

      {/* Modern High-End Horizontal Legend */}
      <div className="absolute bottom-0 sm:bottom-2 left-1/2 -translate-x-1/2 w-max max-w-[95%] pointer-events-none flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 z-10">
        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] sm:border-r sm:border-slate-300 sm:pr-6 shrink-0">Katılım Yoğunluğu</h4>
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-4">
          {[
            { color: '#312e81', label: '200+' },
            { color: '#4338ca', label: '100-199' },
            { color: '#4f46e5', label: '40-99' },
            { color: '#818cf8', label: '15-39' },
            { color: '#c7d2fe', label: '5-14' },
            { color: '#e0e7ff', label: '1-4' },
            { color: '#cbd5e1', label: 'Yok' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 leading-none whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
