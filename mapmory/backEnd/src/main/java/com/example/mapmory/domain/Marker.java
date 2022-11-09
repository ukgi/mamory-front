package com.example.mapmory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Marker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "marker_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private Double Longtitude;

    private Double Latitude;

}