package com.example.mapmory.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

    @Getter
    @Entity
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public class Image {
        @Id@GeneratedValue
        @Column(name = "image_id")
        private Long id;

        @ManyToOne
        @JoinColumn(name = "information_id")
        private Information information;
        private String origFilename;

        private String filename;

        private String filePath;

        @Builder
        public Image(Long id, String origFilename, String filename, String filePath) {
            this.id = id;
            this.origFilename = origFilename;
            this.filename = filename;
            this.filePath = filePath;
        }
    }

