package com.example.mapmory.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

    @Entity
    @Getter
    @Setter
//자동 시간 입력을 위한 어노테이션, MapmoryApplication class에 있는 어노테이션과 연관
    @EntityListeners(AuditingEntityListener.class)
    public class Information {//Board table이라 생각해
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "information_id")
        private Long id;

        @ManyToOne
        @JoinColumn(name = "marker_id")
        private Marker marker;

        private String comment;


        private Long ImageId;

        @CreatedDate
        private LocalDateTime createDate;

        @LastModifiedDate
        private LocalDateTime lastUpdatedDate;


    }

