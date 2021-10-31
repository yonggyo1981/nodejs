CREATE TABLE `file` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '자동 증감 파일 번호 - 업로드되는 파일명',
  `gid` bigint NOT NULL COMMENT '그룹 ID',
  `uploadType` varchar(45) DEFAULT NULL COMMENT '업로드 파일 구분 - board_editor, 에디터 첨부 이미지, board - 게시판 파일 첨부',
  `originalName` varchar(100) DEFAULT NULL COMMENT '원 파일명',
  `mimeType` varchar(65) DEFAULT NULL COMMENT '파일 타입(image/png...)',
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '파일 등록일시',
  PRIMARY KEY (`idx`),
  KEY `ix_gid` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci