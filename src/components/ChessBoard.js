import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Svg, { Rect, Text as SvgText, G, Defs, LinearGradient, Stop, Circle, Path } from 'react-native-svg';

/**
 * Componente de tablero de ajedrez moderno usando SVG
 * Soporta modo interactivo y visual mejorado con piezas profesionales
 */

// Piezas SVG profesionales (paths simplificados estilo Staunton)
const PIECE_PATHS = {
  'K': 'M 22.5,11.63 L 22.5,6 L 20,8 L 25,8 L 22.5,6 L 22.5,11.63 M 20,8 L 15,13 L 30,13 L 25,8 M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z',
  'Q': 'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 30,24.5 17.5,24.5 9,26 z',
  'R': 'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 M 34,14 L 31,17 L 14,17 L 11,14 M 31,17 L 31,29.5 L 14,29.5 L 14,17',
  'B': 'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z M 25,8 L 20,8',
  'N': 'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18 M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30 11.41,27.96 11,27 C 10,27 11.19,28.23 10,29 C 9,29 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',
  'P': 'M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z',
  'k': 'M 22.5,11.63 L 22.5,6 L 20,8 L 25,8 L 22.5,6 L 22.5,11.63 M 20,8 L 15,13 L 30,13 L 25,8 M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z',
  'q': 'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 30,24.5 17.5,24.5 9,26 z',
  'r': 'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 M 34,14 L 31,17 L 14,17 L 11,14 M 31,17 L 31,29.5 L 14,29.5 L 14,17',
  'b': 'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z M 25,8 L 20,8',
  'n': 'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18 M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30 11.41,27.96 11,27 C 10,27 11.19,28.23 10,29 C 9,29 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',
  'p': 'M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z'
};

// Colores modernos del tablero
const LIGHT_SQUARE = '#ebecd0';
const DARK_SQUARE = '#779556';
const HIGHLIGHT_COLOR = 'rgba(255, 255, 0, 0.5)';
const SELECTED_COLOR = 'rgba(20, 85, 30, 0.5)';

function parseFEN(fen) {
  const rows = fen.split(' ')[0].split('/');
  const board = [];
  
  rows.forEach((row) => {
    const boardRow = [];
    for (let char of row) {
      if (isNaN(char)) {
        boardRow.push(char);
      } else {
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push(null);
        }
      }
    }
    board.push(boardRow);
  });
  
  return board;
}

export default function ChessBoard({ 
  position, 
  boardSize = 340,
  interactive = false,
  onSquarePress = null,
  highlightedSquares = [],
  selectedSquare = null,
}) {
  const board = parseFEN(position);
  const squareSize = boardSize / 8;
  
  const handleSquarePress = (row, col) => {
    if (interactive && onSquarePress) {
      onSquarePress({ row, col });
    }
  };
  
  const isHighlighted = (row, col) => {
    return highlightedSquares.some(sq => sq.row === row && sq.col === col);
  };
  
  const isSelected = (row, col) => {
    return selectedSquare && selectedSquare.row === row && selectedSquare.col === col;
  };
  
  return (
    <View style={[styles.container, { width: boardSize, height: boardSize }]}>
      <Svg width={boardSize} height={boardSize}>
        <Defs>
          <LinearGradient id="lightGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#f4f4e8" stopOpacity="1" />
            <Stop offset="1" stopColor="#ebecd0" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="darkGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#8a9a5b" stopOpacity="1" />
            <Stop offset="1" stopColor="#779556" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        
        {/* Tablero con gradientes */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => {
            const isLight = (row + col) % 2 === 0;
            const highlighted = isHighlighted(row, col);
            const selected = isSelected(row, col);
            
            return (
              <G key={`square-${row}-${col}`}>
                <Rect
                  x={col * squareSize}
                  y={row * squareSize}
                  width={squareSize}
                  height={squareSize}
                  fill={isLight ? 'url(#lightGrad)' : 'url(#darkGrad)'}
                  onPress={() => handleSquarePress(row, col)}
                />
                {highlighted && (
                  <Rect
                    x={col * squareSize}
                    y={row * squareSize}
                    width={squareSize}
                    height={squareSize}
                    fill={HIGHLIGHT_COLOR}
                  />
                )}
                {selected && (
                  <Rect
                    x={col * squareSize}
                    y={row * squareSize}
                    width={squareSize}
                    height={squareSize}
                    fill={SELECTED_COLOR}
                    stroke="#2e7d32"
                    strokeWidth="3"
                  />
                )}
              </G>
            );
          })
        )}
        
        {/* Piezas SVG profesionales con sombra */}
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            if (!piece) return null;
            const isWhite = piece === piece.toUpperCase();
            const pieceSize = squareSize * 0.9;
            const offsetX = colIndex * squareSize + (squareSize - pieceSize) / 2;
            const offsetY = rowIndex * squareSize + (squareSize - pieceSize) / 2;
            const scale = pieceSize / 45; // Las piezas están diseñadas en viewBox 45x45
            
            return (
              <G key={`piece-${rowIndex}-${colIndex}`}>
                {/* Sombra suave */}
                <Path
                  d={PIECE_PATHS[piece]}
                  transform={`translate(${offsetX + 1.5}, ${offsetY + 1.5}) scale(${scale})`}
                  fill="rgba(0,0,0,0.25)"
                  onPress={() => handleSquarePress(rowIndex, colIndex)}
                />
                {/* Pieza con degradado */}
                <Defs>
                  <LinearGradient id={`piece-grad-${rowIndex}-${colIndex}`} x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={isWhite ? '#ffffff' : '#2c2c2c'} stopOpacity="1" />
                    <Stop offset="1" stopColor={isWhite ? '#e8e8e8' : '#0a0a0a'} stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Path
                  d={PIECE_PATHS[piece]}
                  transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}
                  fill={`url(#piece-grad-${rowIndex}-${colIndex})`}
                  stroke={isWhite ? '#999999' : '#000000'}
                  strokeWidth="1"
                  strokeLinejoin="round"
                  onPress={() => handleSquarePress(rowIndex, colIndex)}
                />
              </G>
            );
          })
        )}
        
        {/* Coordenadas elegantes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <G key={`coords-${i}`}>
            {/* Letras (a-h) */}
            <SvgText
              x={i * squareSize + squareSize - 8}
              y={boardSize - 6}
              fontSize={11}
              fill={(i % 2 === 0) ? DARK_SQUARE : LIGHT_SQUARE}
              textAnchor="end"
              fontWeight="600"
              opacity="0.8"
            >
              {String.fromCharCode(97 + i)}
            </SvgText>
            
            {/* Números (8-1) */}
            <SvgText
              x={8}
              y={i * squareSize + 15}
              fontSize={11}
              fill={(i % 2 === 0) ? LIGHT_SQUARE : DARK_SQUARE}
              textAnchor="start"
              fontWeight="600"
              opacity="0.8"
            >
              {8 - i}
            </SvgText>
          </G>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    overflow: 'hidden',
  },
});
