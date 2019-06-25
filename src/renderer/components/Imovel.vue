<template>
    <div>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex xs30>
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex d-flex xs12 sm6 md8>
                                    <img src="@/assets/showroom.jpg" width="580px" height="300px" alt="">
                                </v-flex>
                                <v-flex d-flex xs12 sm6 md4 >
                                    <v-layout row wrap>
                                        <v-flex d-flex > 
                                            <img src="@/assets/showroom.jpg" height="150px" width="100px">
                                        </v-flex>
                                        <v-flex d-flex > 
                                            <img src="@/assets/showroom.jpg" height="150px" width="100px">
                                        </v-flex>
                                        <v-flex d-flex > 
                                            <img src="@/assets/showroom.jpg" height="142px" width="100px">
                                        </v-flex>
                                            <v-flex d-flex > 
                                            <img src="@/assets/showroom.jpg" height="142px" width="100px">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                    </v-card>
                    <br>
                    <v-card>
                      <v-card-title>
                          <h2>APARTAMENTO 3 QUARTOS</h2>
                      </v-card-title>
                      <v-card-text>
                          <v-layout row wrap>
                              <v-flex xs12 sm6 md8>
                                  <v-card>
                                      <v-card-title>
                                          <h3>R$500</h3>
                                      </v-card-title>
                                      <v-card-text>
                                          {{lorem}}
                                      </v-card-text>
                                      <v-card-title>
                                            <v-spacer></v-spacer>  
                                            <v-btn :color="color_primary">REQUISITAR</v-btn>
                                            <v-spacer></v-spacer>
                                      </v-card-title>
                                  </v-card>
                              </v-flex>
                              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                              <v-flex xs12 sm6 md3 >
                                    <v-card>
                                        <v-card-title>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm10 md6>
                                                    <v-avatar size="100px">
                                                        <img src="@/assets/eu.png">
                                                    </v-avatar>
                                                </v-flex>
                                                <v-flex d-flex>
                                                    <ul>
                                                        <br>
                                                        <li>Bonito</li>
                                                        <li>Inteligente</li>
                                                        <li>Ceraroido</li>
                                                    </ul>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-title>
                                        <v-card-text>
                                            <div class="text-xs-center"><v-icon color="amber"  v-for="i in n_estrelas">star</v-icon></div>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn class="text-xs-center" :color="color_primary">CONTATO</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                  </v-card>
                              </v-flex>
                          </v-layout>
                      </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        n_estrelas: 5,
        color_primary: '#7b6ff9',
        lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),
    props: {
        id: {
            default: -1
        }
    }
}
</script>

<style>

</style>
