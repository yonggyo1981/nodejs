CREATE TABLE `boarddata` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '게시글 등록 번호 ',
  `boardId` varchar(45) DEFAULT NULL COMMENT '게시판 아이디',
  `memNo` int DEFAULT NULL COMMENT '회원번호',
  `gid` bigint DEFAULT NULL COMMENT '그룹 ID',
  `category` varchar(60) DEFAULT NULL COMMENT '게시판 분류',
  `poster` varchar(45) DEFAULT NULL COMMENT '작성자명',
  `subject` varchar(255) DEFAULT NULL COMMENT '게시글 제목',
  `content` text COMMENT '게시글 본문',
  `password` varchar(65) DEFAULT NULL COMMENT '비회원 글 수정 비밀번호',
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 작성일시',
  `modDt` datetime DEFAULT NULL COMMENT '게시글 수정 일시',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글 데이터'