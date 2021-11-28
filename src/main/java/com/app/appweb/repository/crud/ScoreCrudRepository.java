/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.app.appweb.repository.crud;

import com.app.appweb.controllers.model.Score;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author felip
 */
public interface ScoreCrudRepository extends CrudRepository<Score, Integer>{
    
}
